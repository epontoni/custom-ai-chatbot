"use server";

import serverClient from "@/lib/server/serverClient";
import { gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
  const { query, variables } = await request.json();

  // Uncomment for debugging
  // console.log("DEBUG 1: ", query);
  // console.log("DEBUG 2: ", variables);

  try {
    let result;
    if (query.trim().startsWith("mutation")) {
      // Handle mutations
      result = await serverClient.mutate({
        mutation: gql`
          ${query}
        `,
        variables,
      });
    } else {
      // Handle queries
      result = await serverClient.query({
        query: gql`
          ${query}
        `,
        variables,
      });
    }

    const data = result.data;
    console.log(">>> DATA: ", result);
    return NextResponse.json(
      {
        data,
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
