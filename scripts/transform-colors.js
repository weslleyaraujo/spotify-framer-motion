const polished = require("polished");

function transformColor({ base, prefix }) {
  return {
    [`${prefix}Darkest`]: polished.darken(0.3, base),
    [`${prefix}Darker`]: polished.darken(0.2, base),
    [`${prefix}Dark`]: polished.darken(0.1, base),
    [`${prefix}`]: base,
    [`${prefix}Light`]: polished.lighten(0.1, base),
    [`${prefix}Lighter`]: polished.lighten(0.2, base),
    [`${prefix}Lightest`]: polished.lighten(0.3, base)
  };
}

const colors = {
  primary: "#1DB954",
  secondary: "#000",
  complementary: "#FFF"
};

console.log(
  Object.entries(colors).reduce(
    (acc, [prefix, base]) => ({
      ...acc,
      ...transformColor({
        base,
        prefix
      })
    }),
    {
      white: "#FFF",
      black: "#000"
    }
  )
);
