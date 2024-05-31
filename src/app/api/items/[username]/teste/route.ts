interface ApiUsernameProps {
  params: {
    username: string
  }
}

// caso não quisesse utilizar interface, pode-se utilizar
// { params }: { params: { username: string }

export async function GET(request: Request, { params }: ApiUsernameProps) {
  const username = params.username // 'a', 'b', or 'c'
  return Response.json(username)
}
