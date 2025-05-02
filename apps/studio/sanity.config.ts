import { vyuh } from '@vyuh/sanity-plugin-structure';
import { system } from '@vyuh/sanity-schema-system';
import { defineConfig } from 'sanity';
import { wtt } from 'sanity-schema-wtt'; // Import the miscellaneous feature

export default defineConfig({
  name: 'default',
  title: 'WTT',

  projectId: 'wuudd5ny',
  dataset: 'production',

  plugins: [
    vyuh({
      features: [
        system,
        wtt, // The miscellaneous feature from the template
      ],
    }),
  ],
});
