import React from "react";
import { Button } from "@/components/atoms/button";
import SVGCircle from "@/components/atoms/svg-circle";

function LoadingButton({
  loading,
  children,
  type,
}: {
  type: "button" | "submit" | "reset" | undefined;
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button data-testid={"loading-btn"} type={type} disabled={loading}>
      <span className={"font-bold"}>{children}</span>
      {loading ? (
        <span className="ml-4">
          <SVGCircle />
        </span>
      ) : null}
    </Button>
  );
}

export default LoadingButton;
