export interface Category {
  id: string
  icon: string
}

export interface Racing {
  advertised_start: {
    seconds: number
  }
  category_id: string
  meeting_id: string
  meeting_name: string
  race_id: string
  race_name: string
  race_number: number
  venue_id: string
  venue_name: string
  venue_state: string
}
