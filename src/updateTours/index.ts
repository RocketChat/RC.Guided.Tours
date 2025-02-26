import path from 'path';
import { processAndUpdateTourFiles } from '../utils';

(async () => {

    const rocketChatDir = path.resolve(__dirname, "../../..");
    const toursDir = path.resolve(rocketChatDir, ".tours");

    const rcGuidedToursDir = path.resolve(__dirname, "../..");
    const otherDir = path.join(rcGuidedToursDir, "dist/updateTours/searchStringDir");

    await processAndUpdateTourFiles(toursDir, otherDir);
})();
