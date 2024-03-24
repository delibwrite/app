import { PropsOf } from "@chakra-ui/react";
import CreatableSelect from 'react-select/creatable';
import React from "react";
import { Skills } from "../service/types";

type SkillsInputProps = PropsOf<typeof CreatableSelect>;

const skillsOptions = Object.values(Skills).map((skill) => ({
  value: skill,
  label: skill,
}));

const SkillsInput = React.forwardRef<any, SkillsInputProps>((props, ref) => {
  return (
    <CreatableSelect ref={ref} {...props} isMulti options={skillsOptions} />
  );
});

export default SkillsInput;
