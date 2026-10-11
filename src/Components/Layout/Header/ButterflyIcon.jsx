import React from 'react';

const ButterflyIcon = ({ size = 512, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      {/* Blue wing gradient */}
      <linearGradient id="bf-wing" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00b4ff" />
        <stop offset="50%" stopColor="#009dff" />
        <stop offset="100%" stopColor="#0080ff" />
      </linearGradient>

      {/* Slightly darker blue for lower wings */}
      <linearGradient id="bf-wing-lower" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#009dff" />
        <stop offset="100%" stopColor="#0070d6" />
      </linearGradient>

      {/* Body gradient */}
      <linearGradient id="bf-body" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="50%" stopColor="#3d3d3d" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
    </defs>

    {/* ============ BUTTERFLY (no background, transparent) ============ */}

    {/* ---------- LEFT WINGS ---------- */}
    {/* Upper left wing */}
    <path
      d="M248 240
         C 220 130, 120 40, 40 70
         C 20 80, 25 140, 60 200
         C 90 250, 160 280, 248 262
         Z"
      fill="url(#bf-wing)"
      stroke="#0a0a0a"
      strokeWidth="6"
    />

    {/* Upper left veins */}
    <path d="M120 120 Q 180 180 248 250" stroke="#0a0a0a" strokeWidth="3" fill="none" />
    <path d="M90 165 Q 165 210 248 255" stroke="#0a0a0a" strokeWidth="3" fill="none" />
    <path d="M75 210 Q 160 240 248 260" stroke="#0a0a0a" strokeWidth="3" fill="none" />

    {/* Lower left wing */}
    <path
      d="M248 270
         C 200 320, 90 400, 60 460
         C 50 480, 90 490, 150 470
         C 210 450, 250 350, 248 285
         Z"
      fill="url(#bf-wing-lower)"
      stroke="#0a0a0a"
      strokeWidth="6"
    />

    {/* Lower left veins */}
    <path d="M248 285 Q 160 350 105 445" stroke="#0a0a0a" strokeWidth="3" fill="none" />
    <path d="M248 290 Q 180 375 145 465" stroke="#0a0a0a" strokeWidth="3" fill="none" />

    {/* ---------- RIGHT WINGS (mirrored) ---------- */}
    {/* Upper right wing */}
    <path
      d="M264 240
         C 292 130, 392 40, 472 70
         C 492 80, 487 140, 452 200
         C 422 250, 352 280, 264 262
         Z"
      fill="url(#bf-wing)"
      stroke="#0a0a0a"
      strokeWidth="6"
    />

    {/* Upper right veins */}
    <path d="M392 120 Q 332 180 264 250" stroke="#0a0a0a" strokeWidth="3" fill="none" />
    <path d="M422 165 Q 347 210 264 255" stroke="#0a0a0a" strokeWidth="3" fill="none" />
    <path d="M437 210 Q 352 240 264 260" stroke="#0a0a0a" strokeWidth="3" fill="none" />

    {/* Lower right wing */}
    <path
      d="M264 270
         C 312 320, 422 400, 452 460
         C 462 480, 422 490, 362 470
         C 302 450, 262 350, 264 285
         Z"
      fill="url(#bf-wing-lower)"
      stroke="#0a0a0a"
      strokeWidth="6"
    />

    {/* Lower right veins */}
    <path d="M264 285 Q 352 350 407 445" stroke="#0a0a0a" strokeWidth="3" fill="none" />
    <path d="M264 290 Q 332 375 367 465" stroke="#0a0a0a" strokeWidth="3" fill="none" />

    {/* ---------- WHITE SPOTS along wing edges ---------- */}
    {/* Left upper edge */}
    <circle cx="60" cy="90" r="6" fill="#ffffff" />
    <circle cx="80" cy="105" r="7" fill="#ffffff" />
    <circle cx="100" cy="122" r="6" fill="#ffffff" />
    <circle cx="55" cy="120" r="5" fill="#ffffff" />
    <circle cx="75" cy="145" r="6" fill="#ffffff" />
    <circle cx="100" cy="165" r="5" fill="#ffffff" />
    <circle cx="60" cy="170" r="5" fill="#ffffff" />
    <circle cx="80" cy="200" r="6" fill="#ffffff" />
    <circle cx="110" cy="220" r="5" fill="#ffffff" />
    <circle cx="70" cy="220" r="5" fill="#ffffff" />
    <circle cx="95" cy="245" r="5" fill="#ffffff" />
    <circle cx="130" cy="250" r="4" fill="#ffffff" />
    <circle cx="165" cy="262" r="4" fill="#ffffff" />

    {/* Right upper edge (mirrored) */}
    <circle cx="452" cy="90" r="6" fill="#ffffff" />
    <circle cx="432" cy="105" r="7" fill="#ffffff" />
    <circle cx="412" cy="122" r="6" fill="#ffffff" />
    <circle cx="457" cy="120" r="5" fill="#ffffff" />
    <circle cx="437" cy="145" r="6" fill="#ffffff" />
    <circle cx="412" cy="165" r="5" fill="#ffffff" />
    <circle cx="452" cy="170" r="5" fill="#ffffff" />
    <circle cx="432" cy="200" r="6" fill="#ffffff" />
    <circle cx="402" cy="220" r="5" fill="#ffffff" />
    <circle cx="442" cy="220" r="5" fill="#ffffff" />
    <circle cx="417" cy="245" r="5" fill="#ffffff" />
    <circle cx="382" cy="250" r="4" fill="#ffffff" />
    <circle cx="347" cy="262" r="4" fill="#ffffff" />

    {/* Left lower edge */}
    <circle cx="80" cy="430" r="5" fill="#ffffff" />
    <circle cx="105" cy="450" r="6" fill="#ffffff" />
    <circle cx="130" cy="465" r="6" fill="#ffffff" />
    <circle cx="155" cy="472" r="5" fill="#ffffff" />
    <circle cx="180" cy="470" r="4" fill="#ffffff" />

    {/* Right lower edge (mirrored) */}
    <circle cx="432" cy="430" r="5" fill="#ffffff" />
    <circle cx="407" cy="450" r="6" fill="#ffffff" />
    <circle cx="382" cy="465" r="6" fill="#ffffff" />
    <circle cx="357" cy="472" r="5" fill="#ffffff" />
    <circle cx="332" cy="470" r="4" fill="#ffffff" />

    {/* ---------- BODY ---------- */}
    {/* Abdomen */}
    <ellipse cx="256" cy="350" rx="14" ry="70" fill="url(#bf-body)" />

    {/* Thorax */}
    <ellipse cx="256" cy="255" rx="18" ry="40" fill="url(#bf-body)" />

    {/* Head */}
    <ellipse cx="256" cy="205" rx="15" ry="14" fill="#1a1a1a" />

    {/* Body texture lines */}
    <line x1="245" y1="310" x2="267" y2="310" stroke="#0a0a0a" strokeWidth="2" />
    <line x1="245" y1="330" x2="267" y2="330" stroke="#0a0a0a" strokeWidth="2" />
    <line x1="245" y1="350" x2="267" y2="350" stroke="#0a0a0a" strokeWidth="2" />
    <line x1="245" y1="370" x2="267" y2="370" stroke="#0a0a0a" strokeWidth="2" />
    <line x1="246" y1="390" x2="266" y2="390" stroke="#0a0a0a" strokeWidth="2" />
    <line x1="248" y1="405" x2="264" y2="405" stroke="#0a0a0a" strokeWidth="2" />

    {/* Eyes */}
    <circle cx="249" cy="203" r="4" fill="#0a0a0a" />
    <circle cx="263" cy="203" r="4" fill="#0a0a0a" />
    <circle cx="250" cy="202" r="1.5" fill="#ffffff" />
    <circle cx="264" cy="202" r="1.5" fill="#ffffff" />

    {/* Antennae */}
    <path
      d="M250 195 C 240 160, 220 130, 205 105"
      stroke="#0a0a0a"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="204" cy="103" r="4" fill="#0a0a0a" />

    <path
      d="M262 195 C 272 160, 292 130, 307 105"
      stroke="#0a0a0a"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="308" cy="103" r="4" fill="#0a0a0a" />
  </svg>
);

export default ButterflyIcon;