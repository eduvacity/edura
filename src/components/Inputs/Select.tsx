import { FormHelperText } from "@mui/material"
import clsx from "clsx"
import { InputHTMLAttributes, useId } from "react"
import { Controller } from "react-hook-form"
import Select, { components } from "react-select"
import { ArrowDown, CloseIcon } from "../SVGs"

interface DropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined
  onfocus?: any
  name?: any
  disabled?: boolean
  placeholder?: string | undefined
  defaultValue?: string | number | readonly string[] | undefined
  onChange?: any
  value?: any
  options?: any
  control?: any
  isMulti?: boolean | undefined
  error?: boolean | undefined
  helperText?: string | undefined
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDown />
    </components.DropdownIndicator>
  )
}
const ClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <CloseIcon className="w-4 h-4" />
    </components.ClearIndicator>
  )
}
const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon className="w-3 h-3 text-[#668571] border-[1.5] border-solid border-[#668571]" />
    </components.MultiValueRemove>
  )
}

const controlStyles = {
  base: "peer w-full h-[54px] px-6 rounded-[6.94px] border border-solid border-[#BDBCBC] justify-start items-center gap-3 flex font-arial text-sm lg-md:textbase/[18.4px] font-normal cursor-text text-[#4D6C62] hover:border-primary focus:outline-none focus:border-primary disabled:bg-[#F4F4F4] focus:bg-[#F4F4F4] disabled:hover:border-[#5C5C5C] disabled:cursor-not-allowed disabled:text-[#5C5C5C] placeholder:text-[#4D4D4D] bg-[#F4F4F4]",
  focus: "border-[#BDBCBC]",
  nonFocus: "border-[#BDBCBC]",
  error:
    "peer w-full h-[54px] px-6 rounded-[6.94px] border border-solid border-[#FF0000] justify-start items-center gap-2.5 flex text-[#FF0000] font-arial text-sm lg-md:textbase/[18.4px] font-normal cursor-text hover:border-[#FF0000] focus:outline-none focus:border-[#FF0000] bg-[#F4F4F4]",
  errorFocus: "border-[#FF0000]",
  errorNonFocus: "border-[#FF0000]",
}
const placeholderStyles = "text-[#4D4D4D] pl-1 py-0.5"
const selectInputStyles = "pl-1 py-0.5"
const valueContainerStyles = "gap-1"
const singleValueStyles =
  "font-arial text-sm lg-md:textbase/[18.4px] font-normal cursor-text text-[#4D6C62] ml-1"
const multiValueStyles =
  "bg-[#334138] h-[32px] border border-solid border-[#334138] bg-[#334138] hover:bg-red-500 rounded-[8px] items-center px-[10px] py-[6px] gap-[3px] ml-1"
const multiValueLabelStyles =
  "font-semibold font-arial text-center font-arial text-sm lg-md:textbase/[18.4px] text-[#FFFFFF] py-1 px-2"
const multiValueRemoveStyles =
  "hover:bg-red-500 hover:text-[#4D6C62] text-greytext hover:border-red-300 rounded-md cursor-poarial"
const indicatorsContainerStyles = "p-1 gap-1"
const clearIndicatorStyles =
  "text-greytext p-1 rounded-md hover:bg-transparent hover:text-[#334138] cursor-poarial"
const menuStyles =
  "p-1 mt-2 border border-solid border-[#F4F4F4] bg-[#F4F4F4] rounded-lg"
const groupHeadingStyles =
  "ml-3 mt-2 mb-1 text-greytext text-sm lg-md:textbase/[18.4px]"
const optionStyles = {
  base: "bg-white cursor-pointer border border-solid border-[#F4F4F4] hover:cursor-poarial px-3 py-2 rounded  py-4 px-2 font-normal font-arial text-left font-arial text-sm lg-md:textbase/[18.4px] text-[#4D6C62]",
  focus: "bg-[#F4F4F4] active:bg-[#F4F4F4]",
  selected: "after:text-primary text-[#D1D5DB]",
}

const noOptionsMessageStyles =
  "font-arial text-sm lg-md:textbase/[18.4px] font-normal cursor-text text-[#4D6C62] py-2"

export default function CustomSelect({
  isMulti,
  name,
  value,
  label,
  onChange,
  onfocus,
  disabled,
  placeholder,
  error,
  helperText,
  control,
  options,
  ...otherProps
}: DropdownProps) {
  const id = useId()
  return (
    <div className="w-full relative flex flex-col gap-[9.92px]">
      <label
        className="text-[#4D6C62] font-medium font-arial text-sm lg-md:textbase/[18.4px] text-left capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={isMulti ? [] : ""}
          render={({ field }: any) => (
            <Select
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              isMulti={isMulti}
              options={options}
              unstyled
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  whiteSpace: "normal",
                  overflow: "visible",
                }),
                control: (base) => ({
                  ...base,
                  transition: "none",
                }),
              }}
              components={{
                DropdownIndicator,
                ClearIndicator,
                MultiValueRemove,
              }}
              classNames={{
                control: ({ isFocused }) =>
                  clsx(
                    error
                      ? controlStyles.error
                      : isFocused
                      ? controlStyles.focus
                      : isFocused && error
                      ? controlStyles.errorFocus
                      : !onfocus && error
                      ? controlStyles.errorNonFocus
                      : controlStyles.nonFocus,
                    controlStyles.base
                  ),
                placeholder: () => placeholderStyles,
                input: () => selectInputStyles,
                valueContainer: () => valueContainerStyles,
                singleValue: () => singleValueStyles,
                multiValue: () => multiValueStyles,
                multiValueLabel: () => multiValueLabelStyles,
                multiValueRemove: () => multiValueRemoveStyles,
                indicatorsContainer: () => indicatorsContainerStyles,
                clearIndicator: () => clearIndicatorStyles,
                menu: () => menuStyles,
                groupHeading: () => groupHeadingStyles,
                option: ({ isFocused }) =>
                  clsx(isFocused && optionStyles.focus, optionStyles.base),
                noOptionsMessage: () => noOptionsMessageStyles,
              }}
              instanceId={id}
              {...otherProps}
            />
          )}
        />
      ) : (
        <Select
          placeholder={placeholder}
          isMulti={isMulti}
          options={options}
          unstyled
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
              },
            }),
            multiValueLabel: (base) => ({
              ...base,
              whiteSpace: "normal",
              overflow: "visible",
            }),
            control: (base) => ({
              ...base,
              transition: "none",
            }),
          }}
          components={{
            DropdownIndicator,
            ClearIndicator,
            MultiValueRemove,
          }}
          classNames={{
            control: ({ isFocused }) =>
              clsx(
                error
                  ? controlStyles.error
                  : isFocused
                  ? controlStyles.focus
                  : controlStyles.nonFocus,
                controlStyles.base
              ),
            placeholder: () => placeholderStyles,
            input: () => selectInputStyles,
            valueContainer: () => valueContainerStyles,
            singleValue: () => singleValueStyles,
            multiValue: () => multiValueStyles,
            multiValueLabel: () => multiValueLabelStyles,
            multiValueRemove: () => multiValueRemoveStyles,
            indicatorsContainer: () => indicatorsContainerStyles,
            clearIndicator: () => clearIndicatorStyles,
            menu: () => menuStyles,
            groupHeading: () => groupHeadingStyles,
            option: ({ isFocused }) =>
              clsx(isFocused && optionStyles.focus, optionStyles.base),
            noOptionsMessage: () => noOptionsMessageStyles,
          }}
          instanceId={id}
          {...otherProps}
        />
      )}
      {error && (
        <FormHelperText className="text-[#FF0000] text-xs font-arial font-normal ml-1">
          {helperText}
        </FormHelperText>
      )}
    </div>
  )
}
