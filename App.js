import React from "react";
import RootNavigator from "./src/navigations/RootNavigator";
import AuthProvider from "./src/contexts/AuthProvider";

export default () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};
