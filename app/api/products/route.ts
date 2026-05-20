import { NextResponse } from "next/server";
import { products } from "@/lib/products";
//import {getData} from "@./action";


// GET all products
export async function GET() {
//  getData();
  return NextResponse.json({
    success: true,
    data: products,
  });
}