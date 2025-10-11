export interface ContentItem {
  title: string
  starts: string
  duration: string
  active: boolean
  link: string
}

export interface Subpage {
  name: string
  content: ContentItem[]
}

export interface Program {
  name: string
  subpages: Subpage[]
}
export interface MenuItem {
  name: string
  children?: Program[]
}
