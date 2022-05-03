import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest, response: NextResponse) => {
  request.headers.set('accept-encoding', 'br, gz, deflate')
  return NextResponse.next()
}
