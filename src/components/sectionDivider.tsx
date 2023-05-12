import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from './nav'

const sectionDivider = ({ title = '' }) => {
  return <div>{title ? `${title} |` : ''} Tutu Menezes </div>
}

export default sectionDivider
