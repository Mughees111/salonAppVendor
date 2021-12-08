import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

export function ArrowRight(props) {
  return (
    <Svg
      width={17}
      height={15}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 7.725a.75.75 0 01.648-.743l.102-.007 13.184.001-4.763-4.744a.75.75 0 01.974-1.135l.084.073 6.05 6.024a.751.751 0 01.22.502l.001.03v.028l-.003.045.003-.074a.753.753 0 01-.148.447l-.006.009a.75.75 0 01-.066.075l-6.05 6.025a.75.75 0 01-1.132-.979l.073-.083 4.761-4.743H.75a.75.75 0 01-.75-.75z"
        fill="#111"
      />
    </Svg>
  )
}

export function ArrowDown(props) {
  return (
    <Svg
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.5.75L5 5.25 9.5.75"
        stroke="#FCFCFC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function FbIcon(props) {
  return (
    <Svg
      width={9}
      height={14}
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.469 14V7.875h2.25l.428-2.534H5.469V3.697c0-.693.374-1.369 1.573-1.369H8.26V.171S7.155 0 6.099 0C3.893 0 2.452 1.214 2.452 3.41v1.931H0v2.534h2.452V14h3.017z"
        fill="#E2B378"
      />
    </Svg>
  )
}


export function GoogleIcon(props) {
  return (
    <Svg
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.64 6v2.4h3.97c-.16 1.03-1.2 3.018-3.97 3.018C5.25 11.418 3.3 9.441 3.3 7s1.952-4.418 4.34-4.418c1.36 0 2.27.577 2.791 1.078l1.898-1.83C11.11.692 9.53 0 7.64 0c-3.87 0-7 3.13-7 7s3.13 7 7 7c4.041 0 6.72-2.84 6.72-6.84 0-.46-.049-.811-.11-1.16H7.64z"
        fill="#E2B378"
      />
    </Svg>
  )
}

export function ArrowLeft(props) {
  return (
    <Svg
      width={10}
      height={15}
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.118 1.601l-6 6 6 6"
        stroke="#FCFCFC"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function PlusCircle(props) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={6} cy={6} r={6} fill="#C4C4C4" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.353 2.647a.309.309 0 01.309.309v3.088H9.75a.309.309 0 010 .618H6.662V9.75a.309.309 0 01-.618 0V6.662H2.956a.309.309 0 110-.618h3.088V2.956a.309.309 0 01.309-.309z"
        fill="#000"
      />
    </Svg>
  )
}

export function ArrowRight1(props) {
  return (
    <Svg
      width={7}
      height={12}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 1l5 5-5 5"
        stroke="#fff"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function CameraIcon(props) {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.781 6.855h-3.586l-.854-2.394a.846.846 0 00-.796-.559h-8.09a.842.842 0 00-.793.56l-.857 2.393H4.219c-1.166 0-2.11.944-2.11 2.11v12.023c0 1.166.944 2.11 2.11 2.11H22.78c1.166 0 2.11-.944 2.11-2.11V8.965c0-1.166-.944-2.11-2.11-2.11zM13.5 18.88a4.218 4.218 0 01-4.219-4.219 4.218 4.218 0 014.219-4.219 4.218 4.218 0 014.219 4.22 4.218 4.218 0 01-4.219 4.218zm-2.531-4.219a2.531 2.531 0 105.062 0 2.531 2.531 0 00-5.062 0z"
        fill="#fff"
        fillOpacity={0.1}
      />
    </Svg>
  )
}

export function CrossIcon(props) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.167 2.833L2.833 14.167m11.334 0L2.833 2.833l11.334 11.334z"
        stroke="#fff"
        strokeOpacity={0.2}
        strokeWidth={1.41667}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function PlusIcon(props) {
  return (
    <Svg
      width={11}
      height={11}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.177 0a.431.431 0 01.43.431v4.314h4.315a.431.431 0 110 .863H5.608v4.314a.431.431 0 11-.863 0V5.608H.431a.431.431 0 010-.863h4.314V.431A.431.431 0 015.177 0z"
        fill="#fff"
      />
    </Svg>
  )
}

export function CloseDropDown(props) {
  return (
    <Svg
      width={13}
      height={8}
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.5 6.5l5-5 5 5"
        stroke="#FCFCFC"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function MarkedIcon(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.833.167A3.667 3.667 0 00.167 3.833v18.334a3.667 3.667 0 003.666 3.666h18.334a3.667 3.667 0 003.666-3.666V3.833A3.666 3.666 0 0022.167.167H3.833zm7.334 19.092l-4.963-4.963 2.592-2.592 2.37 2.37 6.954-6.953 2.593 2.592-9.546 9.546z"
        fill="#E2B378"
      />
    </Svg>
  )
}

export function UnMarkedIcon(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.833.167A3.67 3.67 0 00.167 3.833v18.334a3.67 3.67 0 003.666 3.666h18.334a3.67 3.67 0 003.666-3.666V3.833A3.67 3.67 0 0022.167.167H3.833zm0 22V3.833h18.334l.003 18.334H3.833z"
        fill="#fff"
      />
    </Svg>
  )
}


export function SuccessIcon(props) {
  return (
    <Svg
      width={115}
      height={115}
      viewBox="0 0 115 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57.5 100.625c23.817 0 43.125-19.308 43.125-43.125S81.317 14.375 57.5 14.375 14.375 33.683 14.375 57.5s19.308 43.125 43.125 43.125zm0 4.792c26.464 0 47.917-21.453 47.917-47.917 0-26.464-21.453-47.917-47.917-47.917-26.464 0-47.917 21.453-47.917 47.917 0 26.464 21.453 47.917 47.917 47.917z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M83.063 38.954a2.396 2.396 0 01.173 3.383l-32 35.365-19.348-18.47a2.396 2.396 0 013.306-3.464l15.789 15.07 28.7-31.714a2.397 2.397 0 013.385-.168l-.005-.002z"
        fill="#fff"
      />
    </Svg>
  )
}
