import { getDxfString, getDxfBounds } from './dxf.service';

// DxfParser is loaded globally from a script tag in index.html
declare const DxfParser: any;

/**
 * Determines the intrinsic dimensions and aspect ratio of a given file (raster or DXF).
 * @param file The file object.
 * @param buffer The ArrayBuffer content of the file.
 * @returns A promise resolving to the file's dimensions.
 */
export const getFileInfo = async (file: File, buffer: ArrayBuffer): Promise<{ width: number, height: number, aspectRatio: number }> => {
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (fileType === 'dxf') {
        try {
            const parser = new DxfParser();
            const text = await getDxfString(buffer);
            const parsedDxf = parser.parseSync(text);
            if (!parsedDxf) return { width: 1, height: 1, aspectRatio: 1 };
            const { width, height } = getDxfBounds(parsedDxf);
            const aspectRatio = (height === 0 || !isFinite(width) || !isFinite(height)) ? 1 : width / height;
            return { width, height, aspectRatio };
        } catch (e) {
            console.error("Could not determine DXF info", e);
            return { width: 1, height: 1, aspectRatio: 1 };
        }
    } else { // Raster image
        return new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                const w = img.naturalWidth;
                const h = img.naturalHeight;
                const ratio = w / h;
                URL.revokeObjectURL(url);
                resolve({
                    width: w,
                    height: h,
                    aspectRatio: isNaN(ratio) || ratio === 0 ? 1 : ratio
                });
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve({ width: 100, height: 100, aspectRatio: 1 }); // fallback
            };
            img.src = url;
        });
    }
};
