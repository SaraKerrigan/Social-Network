import React from "react";

import NoLogin from "../pages/NoLogin";

type Props = { children: React.ReactNode };

export default function ProtectedRoute({ children }: Props) {
  return localStorage.getItem("accessToken") ? children : <NoLogin />;
}
