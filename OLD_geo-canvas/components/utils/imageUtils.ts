/**
 * Compresses an image file using the HTML Canvas API.
 * @param file The image file to compress.
 * @param options Options for compression, including maxWidth and quality.
 * @returns A promise that resolves with a base64 data URL of the compressed image.
 */
export const compressImage = (
    file: File,
    options: { maxWidth: number; quality: number }
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > options.maxWidth) {
                    height = (options.maxWidth / width) * height;
                    width = options.maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Could not get canvas context'));
                }
                ctx.drawImage(img, 0, 0, width, height);

                resolve(canvas.toDataURL('image/jpeg', options.quality));
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};
