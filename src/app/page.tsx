"use client"

import {useState, useEffect} from "react";
import { getSelligentLists } from "@/utils/selligent.utils";

export default function HomePage() {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => getSelligentLists()
    fetchData().then(data => setData(data))
  }, [])

  console.log(data)

  return (
    <main>
      <p>Test API</p>
    </main>
  )
}
