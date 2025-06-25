// utils/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'dycmecspd', // 🔁 replace with yours if needed
  },
});
