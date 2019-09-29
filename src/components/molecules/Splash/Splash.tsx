import React from "react";
import { View } from "../../atoms/View/View";

function Splash({ children }: { children: React.ReactNode }) {
  return (
    <View
      padding="large"
      align="center"
      justify="center"
      style={{ height: "100vh" }}
    >
      {children}
    </View>
  );
}

export { Splash };
