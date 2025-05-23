function handler({ name, kana, email, source, motivation, message }) {
  if (!name || !kana || !email) {
    return {
      error: "必須項目を入力してください",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      error: "メールアドレスの形式が正しくありません",
    };
  }

  console.log({
    name,
    kana,
    email,
    source,
    motivation: motivation || [],
    message,
  });

  return {
    success: true,
    message: "お問い合わせを受け付けました",
  };
}
export async function POST(request) {
  return handler(await request.json());
}