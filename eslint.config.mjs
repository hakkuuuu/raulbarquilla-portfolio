import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next 16 ships native flat config, so FlatCompat is no longer
// needed (and loading it through FlatCompat now crashes the config validator).
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
