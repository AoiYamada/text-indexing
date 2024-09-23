import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query')


    return NextResponse.json({
        result: query
    })
  }
