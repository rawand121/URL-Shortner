import axios from "../../axiosConfig";
import Users from "../models/User";
import Urls from "../models/Links";
import { nanoid } from "nanoid";

const submitLinkShortner = async (req, res, next) => {
  try {
    const { url } = req.body;
    let { slug } = req.body;

    if (!url) {
      throw new Error("URL ناکرێت بەتاڵ بێت");
    }

    if (!slug) {
      slug = nanoid(5);
    }

    const slugIsExist = await Urls.findOne({ slug });

    if (slugIsExist) {
      throw new Error(
        "ناسنامەکە بەکارهاتووە، تکایە دانەیەکی نوێ داخڵ بکە یاخود هیچ مەنووسە و ڕێگە بدە ئێمە بۆت دیاری بکەین"
      );
    }

    if (slug.length > 5) {
      throw new Error("ناسنامەی لینکەکە نابێت لە 5 پیت زیاتر بێت");
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
    if (website.length === 0) {
      res.status(404);
      throw new Error("هیچ پەڕەیەک نەدۆزرایەوە، تکایە جارێکی تر هەوڵ بدە");
    }
    res.json(`${website[0].url}`);
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
