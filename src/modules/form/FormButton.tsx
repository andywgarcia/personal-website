import * as React from "react";
import { ButtonProps } from "@mui/material";
import ResumeButton from "../components/ResumeButton";
import defer from "./defer";

interface FormButtonProps {
  disabled?: boolean;
  mounted?: boolean;
}

function FormButton<C extends React.ElementType>(
  props: FormButtonProps & ButtonProps<C, { component?: C }>,
) {
  const { disabled, mounted, ...others } = props;
  return (
    <ResumeButton
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...(others as ButtonProps<C, { component?: C }>)}
    />
  );
}
export default defer(FormButton);
