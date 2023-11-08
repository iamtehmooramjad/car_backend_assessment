import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images");
    },
    filename: (req, file, callback) => {
        const fileName =
            path
                .basename(file.originalname, path.extname(file.originalname))
                .toLowerCase()
                .replace(/\s+/g, "-") +
            "-" +
            Date.now().toString() +
            path.extname(file.originalname).toLowerCase();

        callback(null, fileName);
    },
});

const filesHandler = multer({ storage: storage });
export default filesHandler;
