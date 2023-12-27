export async function POST(data: any) {
  const payload = await data.json();

  return Response.json({
    status: 200,
    success: true,
    message: "User login successfully",
  });
}
