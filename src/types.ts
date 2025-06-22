/**
 * 站点基础信息类型 / Site basic information type
 * @description 包含站点标题和描述 / Contains site title and description
 * @property {string} title - 站点标题 / Site title
 * @property {string} base - 站点基础路径 / Site base path
 * @property {string} description - 站点描述 / Site description
 * @property {string} author - 作者名称 / Author name
 * @property {string} website - 网站地址 / Website address
 * @property {string} ogImage - OGP 图片地址 / OGP image address
 */
export type Site = {
  title: string
  base: string
  description: string
  author: string
  website: string
  ogImage: string
}

/**
 * 文章封面图宽高比类型 / Hero image aspect ratio type
 * @description 可选值为 '16/9' 和 '3/4' / Possible values: '16/9' and '3/4'
 */
export type HeroImageAspectRatio = '16/9' | '3/4'

/**
 * 文章封面图布局类型 / Hero image layout type
 * @description 可选值为 'left' 和 'right' / Possible values: 'left' and 'right'
 */
export type HeroImageLayout = 'left' | 'right'

/**
 * 文章卡片类型 / PostCardType
 * @description 可选值为 'compact' 、'image' 和 'time-line' / Possible values: 'compact', 'image' and 'timeLine'
 */
export type PostCardType = 'compact' | 'image' | 'time-line'

/**
 * 文章卡片页面基础配置接口 / Post card page configuration interface
 * @description 用于配置文章卡片页面的显示方式 / Used to configure how post cards are displayed on pages
 * @property {PostCardType} type - 卡片展示类型 / Card display type
 * @property {number} size - 每页显示数量 / Number of items per page
 * @property {HeroImageLayout} heroImageLayout - 特色图片布局方式 / Hero image layout position
 */
export interface PostCardPageConfig {
  type: PostCardType
  size: number
  heroImageLayout?: HeroImageLayout
}

/**
 * 文章配置接口 / Post configuration interface
 * @description 用于配置博客文章相关的全局设置 / Used to configure global settings for blog posts
 * @property {string} title - 文章标题 / Post title
 * @property {string} description - 文章描述 / Post description
 * @property {string} introduce - 文章介绍 / Post introduce
 * @property {string} author - 作者名称 / Author name
 * @property {PostCardPageConfig} homePageConfig - 首页文章展示配置 / Home page posts display configuration
 * @property {PostCardPageConfig} postPageConfig - 文章列表页展示配置 / Posts list page display configuration
 * @property {PostCardPageConfig} tagsPageConfig - 标签页文章展示配置 / Post display configuration for tags page
 * @property {string} defaultHeroImage - 默认文章封面图 / Default hero image for posts
 * @property {HeroImageAspectRatio} defaultHeroImageAspectRatio - 默认图片宽高比 / Default image aspect ratio
 * @property {boolean} imageDarkenInDark - 是否在暗黑模式下对图片进行暗化处理 / Whether to darken images in dark mode
 * @property {string} readMoreText - "阅读更多"按钮文本 / "Read more" button text
 * @property {string} prevPageText - 上一页按钮文本 / Previous page button text
 * @property {string} nextPageText - 下一页按钮文本 / Next page button text
 * @property {string} tocText - 目录文本 / Table of contents text
 * @property {string} backToPostsText - 返回文章列表按钮文本 / Back to posts list button text
 * @property {string} nextPostText - 下一篇文章按钮文本 / Next post button text
 * @property {string} prevPostText - 上一篇文章按钮文本 / Previous post button text
 */
export interface PostConfig {
  title: string
  description: string
  introduce: string
  author: string
  homePageConfig: PostCardPageConfig
  postPageConfig: PostCardPageConfig
  tagsPageConfig: PostCardPageConfig
  defaultHeroImage: string
  defaultHeroImageAspectRatio: HeroImageAspectRatio
  imageDarkenInDark: boolean
  readMoreText: string
  prevPageText: string
  nextPageText: string
  tocText: string
  backToPostsText: string
  nextPostText: string
  prevPostText: string
}

/**
 * 标签配置接口 / Tags configuration interface
 * @property {string} title - 标签页标题 / Tags page title
 * @property {string} description - 标签页描述 / Tags page description
 * @property {string} introduce - 标签页介绍 / Tags page introduce
 */
export interface TagsConfig {
  title: string
  description: string
  introduce: string
}

export interface Skill {
  icon: string
  name: string
}

export interface SkillData {
  direction: 'left' | 'right'
  skills: Skill[]
}

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 */
export interface SkillsShowcaseConfig {
  SKILLS_ENABLED: boolean
  SKILLS_DATA: SkillData[]
}

/**
 * GitHub配置类型 / GitHub configuration type
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */
export type GithubConfig = {
  ENABLED: boolean
  GITHUB_USERNAME: string
  TOOLTIP_ENABLED: boolean
}

/**
 * 链接类型 / Link type
 * @property {string} name - 链接显示名称 / Link display name
 * @property {string} url - 链接URL / Link URL
 */
export type Link = {
  name: string
  url: string
}

/**
 * 社交媒体链接类型 / Social media link type
 * @property {string} name - 平台名称 / Platform name
 * @property {string} url - 个人主页URL / Profile URL
 * @property {string} icon - 图标类名 / Icon class name
 * @property {number} [count] - 可选计数 / Optional count
 */
export type SocialLink = {
  name: string
  url: string
  icon: string
  count?: number
}

/**
 * 项目配置接口 / Project configuration interface
 * @property {string} title - 项目标题 / Project title
 * @property {string} description - 项目描述 / Project description
 * @property {string} introduce - 项目介绍 / Project introduce
 */
export interface ProjectConfig {
  title: string
  description: string
  introduce: string
}

// 项目图标类型 / Project icon type
export type IconType = 'icon' | 'image'

/**
 * 项目类型 / Project type
 * @property {string} name - 项目名称 / Project name
 * @property {string} description - 项目描述 / Project description
 * @property {string} url - 项目URL / Project URL
 * @property {string} githubUrl - 项目github地址 / Project github address
 * @property {IconType} type - 项目图标类型 / Project icon type
 * @property {string} icon - 项目图标 / Project icon
 * @property {string} imageClass - 项目图片样式类名 / Project image style class name
 * @property {number} star - 项目star数量 / Project star count
 * @property {number} fork - 项目fork数量 / Project fork count
 */

export interface Project {
  name: string
  description: string
  website?: string
  githubUrl?: string
  type: IconType
  icon: string
  imageClass?: string
  star?: number
  fork?: number
}
