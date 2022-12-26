import axios from "../../axiosConfig";
import Users from "../models/User";
import Urls from "../models/Links";
import { nanoid } from "nanoid";

const submitLinkShortner = async (req, res, next) => {
  try {
    const { url } = req.body;
    let { slug } = req.body;

    if (!url) {
      throw new Error("Url and slug cannot be empty");
    }

    if (!slug) {
      slug = nanoid(5);
    }

    const slugIsExist = await Urls.findOne({ slug });

    if (slugIsExist) {
      throw new Error("Slug is already exist");
    }

    if (slug.length > 5) {
      throw new Error("Slug should be at most 5 charecters long");
    }

    const newUrl = await new Urls({
      slug,
      url,
      shortUrl: `${axios.defaults.baseURL}/${slug}`,
    });

    newUrl.save();

    if (req.user) {
      await Users.findByIdAndUpdate(req.user._id, {
        $push: { links: newUrl._id },
      });
    }

    res.json(`${axios.defaults.baseURL}/${slug}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

const visitLink = async (req, res, next) => {
  try {
    const { id } = req.query;
    const website = await Urls.find({ slug: id });
    res.json(website[0].url);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserUrls = async (req, res, next) => {
  try {
    const urls = await Users.findById(req.user._id).populate("links");
    res.json(urls);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { submitLinkShortner, visitLink, getUserUrls };
