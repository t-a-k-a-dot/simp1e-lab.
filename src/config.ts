import type { GithubConfig, Link, PostConfig, Project, ProjectConfig, Site, SkillsShowcaseConfig, SocialLink, TagsConfig } from '~/types'

export const SITE: Site = {
  title: 'simp1e-lab.',
  description: 'Very simple lab experiment records',
  website: 'https://simp1e-lab.com/',
  base: '/',
  author: 'taka.',
  ogImage: '/og-image.jpg',
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Posts',
    url: '/posts',
  },
  /* 2025/06/22
  {
    name: 'Projects',
    url: '/projects',
  },
  2025/06/22 */
  {
    name: 'Tags',
    url: '/tags',
  },
]

export const FOOTER_LINKS: Link[] = [
  /* 2025/06/22
  {
    name: 'Readme',
    url: '/',
  },
  2025/06/22 */
  {
    name: 'Posts',
    url: '/posts',
  },
  /* 2025/06/22
  {
    name: 'Projects',
    url: '/projects',
  },
  2025/06/22 */
  {
    name: 'Tags',
    url: '/tags',
  },
]

// get icon https://icon-sets.iconify.design/

export const SOCIAL_LINKS: SocialLink[] = [
/* 2025/06/22
  {
    name: 'github',
    url: 'https://github.com/yourname',
    icon: 'icon-[ri--github-fill]',
  },
  {
    name: 'twitter',
    url: 'https://x.com/yourname',
    icon: 'icon-[ri--twitter-x-fill]',
  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/yourSpaceId',
    icon: 'icon-[ri--bilibili-fill]',
  },
2025/06/22 */
  ]

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'VMware Cloud Foundation',
          icon: 'icon-[carbon--logo-vmware-alt]',
        },
        {
          name: 'Windows',
          icon: 'icon-[mdi--microsoft-windows]',
        },
        {
          name: 'Linux',
          icon: 'icon-[ant-design--linux-outlined]',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Amazon Web Services',
          icon: 'icon-[flowbite--aws-solid]',
        },
        {
          name: 'Google Cloud Platform',
          icon: 'icon-[arcticons--google-cloud]',
        },
        {
          name: 'Datadog',
          icon: 'icon-[simple-icons--datadog]',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'PowerShell',
          icon: 'icon-[mdi--powershell]',
        },
        {
          name: 'HUGO',
          icon: 'icon-[devicon-plain--hugo]',
        },
        {
          name: 'Astro',
          icon: 'icon-[lineicons--astro]',
        },
      ],
    },
  ],
}

/**
 * GitHub配置 / GitHub configuration
 *
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */


export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 't-a-k-a-dot',
  TOOLTIP_ENABLED: true,
}

export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Posts by taka.',
  introduce: 'View all posts from this blog here.',
  author: 'taka.',
  homePageConfig: {
    size: 5,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  /* 2025/06/28 mod */
  defaultHeroImage: 'og-image.png',
  defaultHeroImageAspectRatio: '16/9',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'Catalogue',
  backToPostsText: 'Back to Posts',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All tags of Posts',
  introduce: 'All the tags for posts are here, you can click to filter them.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'The examples of my projects.',
  introduce: 'The examples of my projects.',
}

// get icon https://icon-sets.iconify.design/
export const ProjectList: Project[] = [
  {
    name: 'Litos',
    description: 'A Simple & Modern Blog Theme for Astro.',
    githubUrl: 'https://github.com/Dnzzk2/Litos',
    website: 'https://litos.vercel.app/',
    type: 'image',
    icon: '/projects/logo.png',
    star: 11,
    fork: 4,
  },
]