import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { checklistData } from "../constants";
import Links from "./ReportingLinks";
import SetupGuide from "./SetupGuide";

const RenderTasks = ({ tasks, checked, handleChange, handleChildChange }) => {
  return tasks.map((task, index) => {
    if (task.type === "single") {
      return (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={!!checked[task.label]}
              onChange={() => handleChange(task.label)}
              sx={{
                color: "#1A73E8", // Default blue
                "&.Mui-checked": {
                  color: "#1A73E8", // When checked
                },
              }}
            />
          }
          label={task.label}
        />
      );
    } else if (task.type === "multiple") {
      const allChecked = task.children.every((child) => checked[child.label]);
      const someChecked = task.children.some((child) => checked[child.label]);

      return (
        <div key={index}>
          <FormControlLabel
            label={task.label}
            control={
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked && !allChecked}
                onChange={() => handleChange(task.label, task.children)}
                sx={{
                  color: "#1A73E8",
                  "&.Mui-checked": {
                    color: "#1A73E8",
                  },
                  "&:hover": {
                    boxShadow: "0 0 10px rgba(26, 115, 232, 0.6)",
                  },
                }}
              />
            }
          />
          <div className="pl-4 flex flex-col">
            {task.children.map((child, childIndex) => (
              <FormControlLabel
                key={childIndex}
                control={
                  <Checkbox
                    checked={!!checked[child.label]}
                    onChange={() =>
                      handleChildChange(child.label, task.label, task.children)
                    }
                    sx={{
                      color: "#1A73E8",
                      "&.Mui-checked": {
                        color: "#1A73E8",
                      },
                      "&:hover": {
                        boxShadow: "0 0 10px rgba(26, 115, 232, 0.6)",
                      },
                    }}
                  />
                }
                label={child.label}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  });
};

const Structure = ({ name }) => {
  const [checked, setChecked] = useState({});
  console.log(checked);

  const handleChange = (label, children = []) => {
    const newChecked = { ...checked };
    const isChecked = !newChecked[label];

    newChecked[label] = isChecked;
    if (children.length) {
      children.forEach((child) => {
        newChecked[child.label] = isChecked;
      });
    }

    setChecked(newChecked);
  };

  const handleChildChange = (childLabel, parentLabel, children) => {
    const newChecked = { ...checked };
    newChecked[childLabel] = !newChecked[childLabel];

    const allChildrenChecked = children.every(
      (child) => newChecked[child.label]
    );
    newChecked[parentLabel] = allChildrenChecked;

    setChecked(newChecked);
  };

  return (
    <div>
      <main className="bg-white w-full rounded-2xl shadow-lg relative">
        <div className="py-4 px-4 relative flex items-center justify-between">
          <h1 className="text-4xl text-googleBlue-400">
            Store Visit Checklist
          </h1>
          <img
            src="/Navigation.png"
            alt=""
            className="w-[300px] lg:w-[450px] object-cover"
          />
        </div>
        <div className="bg-[#F6F7FA] w-full h-[2px]" />

        <div className="mt-6 ml-6 pb-8">
          {checklistData.map((section, index) => (
            <section key={index} className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 ml-2 text-xl">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <input
                      type="checkbox"
                      className="mr-2 shadow-sm hover:shadow-lg checked:bg-blue-500 size-4"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="absolute top-[62%] right-[8%] w-[450px] h-[450px] md:w-[300px] md:h-[300px] md:top-[70%] md:right-[5%]">
          <img src="/assets/TSM Toolbelt.png" alt="Toolbelt" />
        </div>

        <div className="absolute top-[40%] right-[8%] w-[90px] h-[90px] rounded-full border-[1px] md:w-[60px] md:h-[60px] md:top-[50%] md:right-[5%]">
          <img src="/assets/Structure Vector.png" alt="Structure Vector" />
          <div className="absolute top-[10%] left-[-15%] w-10 p-2 bg-white rounded-full border-[1px] md:w-6">
            <img src="Google Logo.png" alt="Google Logo" />
          </div>
        </div>
      </main>
      <Links />
      <SetupGuide />
    </div>
  );
};

export default Structure;
