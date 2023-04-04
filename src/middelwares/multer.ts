import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req: any, _file: any, callback) => {
    callback(null, __dirname + "../../../../public/images/services");
  },
  filename: (_req: any, file: any, callback) => {
    const uid = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extension = file.mimetype as string;
    extension = extension.split("/")[1];
    callback(null, `${uid}.${extension}`);
  },
});

export const uploadServiceImage = multer({ storage });
