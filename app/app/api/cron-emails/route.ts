export async function GET() {
  try {
    const res = await fetch(
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/functions/v1/send-emails"
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
