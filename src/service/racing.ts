import request from './request'
import { Racing } from '@/types/racing'

interface GetRacingPayload {
  method: string
  count?: number
}

interface GetRacingResponse {
  next_to_go_ids: string[]
  race_summaries: Record<string, Racing>
}

export function getRacingList(
  payload: GetRacingPayload
): Promise<GetRacingResponse> {
  return request
    .get('/racing/', {
      params: payload,
    })
    .then((response) => response.data)
}
