import { NextResponse } from "next/server";
import { products } from "@/lib/products";

// DELETE product
/*
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  products.splice(index, 1);

  return NextResponse.json({
    success: true,
    message: "Product deleted successfully",
  });
}*/