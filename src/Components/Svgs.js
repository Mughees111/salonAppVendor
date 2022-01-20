import * as React from "react"
import Svg, { Path, Circle, G, Defs, ClipPath, Rect, Mask } from "react-native-svg"

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
        stroke={props.color ? props.color : "#FCFCFC"}
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


export function ScheduleAppBtmIcon(props) {
  return (
    <Svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M3.167 20.583h13.416c1.057 0 1.917-.86 1.917-1.916V5.25c0-1.057-.86-1.917-1.917-1.917h-1.916V1.416H12.75v1.917H7V1.416H5.083v1.917H3.167c-1.057 0-1.917.86-1.917 1.917v13.416c0 1.058.86 1.917 1.917 1.917z"
        stroke={props.color}
      // strokeOpacity={0.5}
      />
      <Path
        clipRule="evenodd"
        d="M3.167 6.208h13v2h-13v-2z"
        stroke={props.color}
      // strokeOpacity={0.5}
      />
    </Svg>
  )
}


export function ProfileBtmIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.667 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H6.667a3.333 3.333 0 00-3.334 3.333V17.5M10 9.167A3.333 3.333 0 1010 2.5a3.333 3.333 0 000 6.667z"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function SalonProfileIcon(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.1 12.65v3.3a.55.55 0 00.55.55h3.3a.55.55 0 00.55-.55v-3.3a.55.55 0 00-.55-.55h-3.3a.55.55 0 00-.55.55zm1.1 2.75v-2.2h2.2v2.2h-2.2z"
        fill={props.color ? props.color : "#8E8E8E"}
      />
      <Path
        d="M5.5 2.2a.55.55 0 00-.422.198l-2.75 3.3a.55.55 0 00-.128.352V7.7a3.29 3.29 0 001.1 2.46v9.09a.55.55 0 00.55.55h14.3a.55.55 0 00.55-.55v-9.09a3.293 3.293 0 001.1-2.46V6.03c0-.099 0-.178-.128-.332l-2.75-3.3A.55.55 0 0016.5 2.2h-11zm0 7.7a2.2 2.2 0 01-2.2-2.2V6.6h4.4v1.1a2.2 2.2 0 01-2.2 2.2zm5.5 0a2.2 2.2 0 01-2.2-2.2V6.6h4.4v1.1A2.2 2.2 0 0111 9.9zm5.5 0a2.2 2.2 0 01-2.2-2.2V6.6h4.4v1.1a2.2 2.2 0 01-2.2 2.2zm-11 8.8H4.4v-7.887a3.297 3.297 0 003.85-1.287A3.297 3.297 0 0011 11a3.296 3.296 0 002.75-1.475 3.297 3.297 0 003.85 1.287V18.7H11v-6.05a.55.55 0 00-.55-.55h-4.4a.55.55 0 00-.55.55v6.05zM7.854 5.5h-3.93l1.833-2.2h2.83l-.733 2.2zm5.133 0H9.013l.733-2.2h2.508l.733 2.2zm1.159 0l-.733-2.2h2.83l1.833 2.2h-3.93zM6.6 18.7v-5.5h3.3v5.5H6.6z"
        fill={props.color ? props.color : "#8E8E8E"}
      />
    </Svg>
  )
}

export function NotificationIcon(props) {
  return (
    <Svg
      width={24}
      height={27}
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.41 4.726c1.544.872 2.728 2.284 2.728 4.25v6.604l3.304 3.731c1.259 1.422.25 3.664-1.65 3.664H2.208c-1.899 0-2.908-2.242-1.649-3.664l3.304-3.73V8.975c0-1.965 1.184-3.377 2.728-4.249 1.528-.862 3.497-1.264 5.41-1.264 1.913 0 3.883.402 5.41 1.264zM7.519 6.371C6.365 7.02 5.75 7.895 5.75 8.975V15.7c0 .386-.14.756-.395 1.043l-3.383 3.82a.315.315 0 00.235.524h19.586c.271 0 .415-.32.235-.524l-3.383-3.82a1.572 1.572 0 01-.395-1.043V8.975c0-1.08-.615-1.953-1.768-2.604-1.17-.661-2.798-1.02-4.482-1.02-1.684 0-3.311.359-4.481 1.02z"
        fill="#fff"
      />
      <Path
        d="M14.518 2.518a2.518 2.518 0 11-5.036 0 2.518 2.518 0 015.036 0z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.65 21.087h10.7v.944c0 1.303-.606 2.517-1.62 3.387-1.011.867-2.355 1.334-3.73 1.334-1.37 0-2.747-.464-3.762-1.334-1.03-.883-1.589-2.103-1.589-3.387v-.944zm2.074 1.888c.153.37.4.716.743 1.01.637.546 1.565.878 2.532.878.961 0 1.86-.328 2.502-.878.347-.298.601-.644.76-1.01H8.724z"
        fill="#fff"
      />
    </Svg>
  )
}

export function ChatSendIcon(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_87_4524)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.564 3.597c.809-.324 1.612.48 1.289 1.289l-8.448 21.118c-.343.857-1.569.821-1.861-.055l-3.011-9.033-9.033-3.01c-.876-.293-.912-1.52-.055-1.862l21.119-8.447zM13.226 16.46l2.323 6.97 6.197-15.49-8.52 8.52zm7.282-9.757L5.018 12.9l6.97 2.323 8.52-8.52z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_87_4524">
          <Path fill="#fff" d="M0 0H28V28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function SearchIcon(props) {
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
        d="M7.792 13.458a5.667 5.667 0 100-11.333 5.667 5.667 0 000 11.333zM14.875 14.875l-3.081-3.081"
        stroke="#FCFCFC"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function GroupIcon(props) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.5 7.5c-.606-2.496-3.023-4.5-6-4.5-3.258 0-5.97 2.685-6 6 .03 3.315 2.742 6 6 6H12h-1.5c-4.932 0-9 4.029-9 9v3M18 19.5a6 6 0 100-12 6 6 0 000 12v0zM9 33v-4.5a9 9 0 0118 0V33H9zM19.5 7.5c.606-2.496 3.023-4.5 6-4.5 3.258 0 5.97 2.685 6 6-.03 3.315-2.742 6-6 6H24h1.5c4.932 0 9 4.029 9 9v3l-15-19.5z"
        stroke="#fff"
        strokeWidth={3}
      />
    </Svg>
  )
}


export function ArrowForward(props) {
  return (
    <Svg
      width={13}
      height={22}
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 2l9 9-9 9"
        stroke="#FCFCFC"
        strokeOpacity={0.15}
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function MsgIcon(props) {
  return (
    <Svg
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_77_3433)" fill="#000">
        <Path d="M2.475 11.32a.914.914 0 01.263.733c-.065.62-.186 1.232-.364 1.83 1.276-.296 2.055-.638 2.41-.817a.915.915 0 01.649-.068c.623.166 1.265.25 1.91.249 3.656 0 6.404-2.568 6.404-5.489 0-2.92-2.748-5.488-6.403-5.488C3.688 2.27.94 4.838.94 7.758c0 1.343.565 2.589 1.535 3.562zm-.45 3.572c-.218.043-.435.083-.653.119-.183.029-.322-.161-.25-.332.081-.191.156-.386.223-.582l.003-.01a9.554 9.554 0 00.48-2.12C.704 10.84.024 9.367.024 7.757c0-3.536 3.277-6.403 7.319-6.403 4.041 0 7.318 2.867 7.318 6.403 0 3.537-3.277 6.404-7.318 6.404a8.286 8.286 0 01-2.147-.28c-.476.24-1.5.678-3.173 1.01z" />
        <Path d="M3.685 5.471a.457.457 0 01.457-.457h6.403a.457.457 0 010 .915H4.142a.457.457 0 01-.457-.458zm0 2.287a.457.457 0 01.457-.457h6.403a.457.457 0 010 .915H4.142a.457.457 0 01-.457-.458zm0 2.287a.457.457 0 01.457-.457h3.659a.457.457 0 010 .915H4.142a.458.458 0 01-.457-.458z" />
      </G>
      <Defs>
        <ClipPath id="clip0_77_3433">
          <Path
            fill="#fff"
            transform="translate(.025 .44)"
            d="M0 0H14.6364V14.6364H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function CallIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.173 16.012a1.367 1.367 0 00.977-.403L15 13.76a.683.683 0 000-.964l-2.732-2.732a.683.683 0 00-.963 0l-1.093 1.086a5.156 5.156 0 01-2.05-1.086 5.205 5.205 0 01-1.085-2.05l1.086-1.092a.683.683 0 000-.963L5.432 3.226a.683.683 0 00-.963 0L2.624 5.084a1.366 1.366 0 00-.403.976 10.436 10.436 0 002.937 7.015 10.437 10.437 0 007.015 2.937zM4.953 4.681l1.77 1.769-.881.88a.683.683 0 00-.205.622 6.913 6.913 0 001.57 3.074 6.885 6.885 0 003.074 1.57.683.683 0 00.622-.184l.88-.901 1.77 1.769-1.366 1.366a9.07 9.07 0 01-6.059-2.534 9.07 9.07 0 01-2.54-6.065L4.954 4.68zm9.563 3.818h1.366A6.017 6.017 0 009.735 2.35v1.367a4.624 4.624 0 014.781 4.78z"
        fill="#000"
      />
      <Path
        d="M9.735 6.45c1.434 0 2.049.614 2.049 2.049h1.366c0-2.2-1.216-3.415-3.415-3.415V6.45z"
        fill="#000"
      />
    </Svg>
  )
}

export function MailIcon(props) {
  return (
    <Svg
      width={18}
      height={12}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.076.044H2.026a1.17 1.17 0 00-1.172 1.17v9.368a1.17 1.17 0 001.171 1.17h14.051a1.17 1.17 0 001.171-1.17V1.215a1.17 1.17 0 00-1.17-1.171zm-1.288 1.17l-5.737 3.97-5.738-3.97h11.475zM2.025 10.583V1.747l6.692 4.631a.585.585 0 00.668 0l6.691-4.63v8.834H2.026z"
        fill="#000"
      />
    </Svg>
  )
}



export function PlusIcon1(props) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1297_671)">
        <Mask
          id="a"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x={13}
          y={13}
          width={16}
          height={16}
        >
          <Path
            d="M28.458 22.208h-6.25v6.25h-2.083v-6.25h-6.25v-2.083h6.25v-6.25h2.083v6.25h6.25v2.083z"
            fill="#5F5F5F"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            fill="#fff"
            d="M0.333008 0.333252H41.999708V41.999952H0.333008z"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_1297_671">
          <Path
            fill="#fff"
            transform="translate(.333 .333)"
            d="M0 0H41.6667V41.6667H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}


export function RattingStarIcon(props) {
  return (
    <Svg
      width={12}
      height={11}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.715.878a.3.3 0 01.57 0l.995 3.06a.3.3 0 00.285.208h3.218a.3.3 0 01.176.543L8.356 6.58a.3.3 0 00-.109.335l.994 3.061a.3.3 0 01-.461.335L6.176 8.42a.3.3 0 00-.352 0L3.22 10.31a.3.3 0 01-.461-.335l.994-3.06a.3.3 0 00-.109-.336L1.041 4.69a.3.3 0 01.176-.543h3.218a.3.3 0 00.285-.207l.995-3.06z"
        fill="#FE9D2C"
      />
    </Svg>
  )
}

export function HeartIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.367 3.842a4.583 4.583 0 00-6.484 0L10 4.725l-.883-.883a4.584 4.584 0 10-6.484 6.483l.884.883L10 17.692l6.483-6.484.884-.883a4.585 4.585 0 000-6.483v0z"
        stroke="#E2B378"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function PhoneIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.666 11.28v2a1.334 1.334 0 01-1.453 1.334 13.193 13.193 0 01-5.753-2.047 13 13 0 01-4-4 13.193 13.193 0 01-2.047-5.78A1.333 1.333 0 012.74 1.334h2A1.333 1.333 0 016.073 2.48a8.56 8.56 0 00.467 1.874 1.333 1.333 0 01-.3 1.406l-.847.847a10.667 10.667 0 004 4l.847-.847a1.334 1.334 0 011.406-.3 8.558 8.558 0 001.874.467 1.333 1.333 0 011.146 1.353z"
        stroke="#111"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function SettingsIcon(props) {
  return (
    <Svg
      width={props.width ? props.width : 16}
      height={props.height ? props.height : 17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_117_3787)"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M8 10.376a2 2 0 100-4 2 2 0 000 4z" />
        <Path d="M12.933 10.376a1.1 1.1 0 00.22 1.213l.04.04a1.333 1.333 0 11-1.886 1.887l-.04-.04a1.1 1.1 0 00-1.214-.22 1.1 1.1 0 00-.666 1.007v.113a1.333 1.333 0 01-2.667 0v-.06A1.1 1.1 0 006 13.31a1.1 1.1 0 00-1.213.22l-.04.04a1.333 1.333 0 01-2.176-1.454c.067-.161.165-.308.29-.432l.04-.04a1.1 1.1 0 00.22-1.214 1.1 1.1 0 00-1.008-.666H2a1.333 1.333 0 110-2.667h.06a1.1 1.1 0 001.007-.72 1.1 1.1 0 00-.22-1.213l-.04-.04a1.333 1.333 0 111.886-1.887l.04.04a1.1 1.1 0 001.214.22H6a1.1 1.1 0 00.667-1.007v-.113a1.333 1.333 0 112.666 0v.06A1.1 1.1 0 0010 3.443a1.1 1.1 0 001.213-.22l.04-.04a1.333 1.333 0 111.887 1.886l-.04.04a1.1 1.1 0 00-.22 1.214v.053a1.1 1.1 0 001.007.667H14a1.333 1.333 0 010 2.666h-.06a1.1 1.1 0 00-1.007.667v0z" />
      </G>
      <Defs>
        <ClipPath id="clip0_117_3787">
          <Path fill="#fff" transform="translate(0 .376)" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}


export function PencilIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.688 4.594l-3.282-3.282L2.281 14.438.97 19.03l4.593-1.312L18.688 4.594zm-5.907-.657l3.281 3.282-3.28-3.282zm-10.5 10.5l3.281 3.282-3.28-3.282z"
        stroke="#000"
        strokeWidth={1.3125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function CameraIcon2(props) {
  return (
    <Svg
      width={13}
      height={12}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.045 1.226c-.605 0-1.121.437-1.22 1.034l-.173 1.034a.468.468 0 01-.461.391h-.18c-.683 0-1.237.554-1.237 1.238v4.69c0 .683.554 1.237 1.237 1.237h7.7c.683 0 1.237-.554 1.237-1.238v-4.69c0-.683-.553-1.237-1.237-1.237h-.165a.467.467 0 01-.462-.393l-.166-1.026a1.237 1.237 0 00-1.221-1.04H5.045zm-2.034.898A2.062 2.062 0 015.045.4h3.652c1.012 0 1.874.734 2.036 1.734l.118.73a2.063 2.063 0 011.923 2.058v4.69a2.063 2.063 0 01-2.063 2.062h-7.7A2.062 2.062 0 01.95 9.612v-4.69c0-1.097.857-1.994 1.938-2.058l.124-.74z"
        fill="#14142B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.86 5.243a1.597 1.597 0 100 3.194 1.597 1.597 0 000-3.194zM4.438 6.84a2.422 2.422 0 114.844 0 2.422 2.422 0 01-4.844 0z"
        fill="#14142B"
      />
    </Svg>
  )
}


export function VerticalDots(props) {
  return (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.75 16.5a2.75 2.75 0 105.5 0 2.75 2.75 0 00-5.5 0zm0-8.25a2.75 2.75 0 105.5 0 2.75 2.75 0 00-5.5 0zm0 16.5a2.75 2.75 0 105.5 0 2.75 2.75 0 00-5.5 0z"
        fill="#FFF1F1"
      />
    </Svg>
  )
}


export function CancelIcon(props) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18 0C8.1 0 0 8.1 0 18s8.1 18 18 18 18-8.1 18-18S27.9 0 18 0zm0 4c3.1 0 6 1.1 8.4 2.8L6.8 26.4C5.1 24 4 21.1 4 18c0-7.7 6.3-14 14-14zm0 28c-3.1 0-6-1.1-8.4-2.8L29.2 9.6C30.9 12 32 14.9 32 18c0 7.7-6.3 14-14 14z"
        fill="#D50000"
      />
    </Svg>
  )
}


export function CheckOutCompleteIcon(props) {
  return (
    <Svg
      width={97}
      height={97}
      viewBox="0 0 97 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.5 91.625c23.817 0 43.125-19.308 43.125-43.125S72.317 5.375 48.5 5.375 5.375 24.683 5.375 48.5 24.683 91.625 48.5 91.625zm0 4.792c26.464 0 47.917-21.453 47.917-47.917C96.417 22.036 74.964.583 48.5.583 22.036.583.583 22.036.583 48.5c0 26.464 21.453 47.917 47.917 47.917z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.063 29.954a2.396 2.396 0 01.173 3.383l-32 35.365-19.348-18.47a2.395 2.395 0 013.306-3.464l15.789 15.07 28.7-31.714a2.396 2.396 0 013.385-.168l-.005-.002z"
        fill="#fff"
      />
    </Svg>
  )
}


export function ProfileOutline(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.809 30.714c6.845-1 11.558-.914 18.412.035A2.077 2.077 0 0131 32.818c0 .48-.165.946-.463 1.31A61.283 61.283 0 0128.941 36h2.641c.166-.198.333-.4.502-.605A4.071 4.071 0 0033 32.819c0-2.025-1.478-3.77-3.505-4.05-7.016-.971-11.92-1.064-18.975-.033-2.048.299-3.52 2.071-3.52 4.11 0 .905.295 1.8.854 2.525.165.214.328.424.49.63h2.577c-.507-.606-1-1.223-1.482-1.85A2.144 2.144 0 019 32.845c0-1.077.774-1.98 1.809-2.131zM20 21a6 6 0 100-12.002A6 6 0 0020 21zm0 2a8 8 0 100-16.001A8 8 0 0020 23z"
        fill="#929090"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 38c9.941 0 18-8.059 18-18S29.941 2 20 2 2 10.059 2 20s8.059 18 18 18zm0 2c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
        fill="#929090"
      />
    </Svg>
  )
}


export function UserProfileIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 3a3.75 3.75 0 110 7.5A3.75 3.75 0 019 3zm0-1.5A5.25 5.25 0 109 12 5.25 5.25 0 009 1.5zM16.5 22.5H15v-3.75A3.75 3.75 0 0011.25 15h-4.5A3.75 3.75 0 003 18.75v3.75H1.5v-3.75a5.25 5.25 0 015.25-5.25h4.5a5.25 5.25 0 015.25 5.25v3.75zM16.5 3H24v1.5h-7.5V3zM16.5 6.75H24v1.5h-7.5v-1.5zM16.5 10.5h5.25V12H16.5v-1.5z"
        fill="#fff"
      />
    </Svg>
  )
}
