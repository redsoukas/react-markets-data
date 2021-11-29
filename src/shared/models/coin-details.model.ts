import sanitizeHtml from 'sanitize-html';
import { currencyFormat } from 'shared/utils';
import { Coin, CoinVM } from 'shared/models/coin.model';

export interface CoinDetails extends Coin {
  description: string;
  upvotePercentage: number;
  downvotePercentage: number;
  ath: string;
  atl: string;
  athDate: string;
  atlDate: string;
  social: SocialData;
  reputation: Reputation;
  github: Github;
  contactLinks: ContactLinks;
  priceChangePercentage: Percentage;
}

export type Percentage = { [key: string]: any };

export interface SocialDataItem {
  link: string;
  subs: string;
}

export interface SocialData {
  facebook: SocialDataItem;
  twitter: SocialDataItem;
  reddit: SocialDataItem;
  telegram: SocialDataItem;
}

export interface Reputation {
  upvotes: number;
  downvotes: number;
}

export interface Github {
  repos: Array<string>;
  forks: string;
  stars: string;
  subscribers: string;
  issues: string;
}

export interface ContactLinks {
  website: Array<string>;
  explorers: Array<string>;
  forum: Array<string>;
  chat: Array<string>;
  announcement: Array<string>;
}

export class CoinDetailsVM extends CoinVM implements CoinDetails {
  description: string;
  upvotePercentage: number;
  downvotePercentage: number;
  ath: string;
  atl: string;
  athDate: string;
  atlDate: string;
  social: SocialData;
  reputation: Reputation;
  github: Github;
  contactLinks: ContactLinks;
  priceChangePercentage: Percentage;
  constructor(data: any) {
    super(data);
    this.image = data?.image?.small;
    this.price = currencyFormat(data?.market_data?.current_price?.usd) || '';
    this.high24 = data?.market_data?.high_24h?.usd || '';
    this.low24 = data?.market_data?.low_24h?.usd || '';
    this.description = sanitizeHtml(data?.description?.en) || '';
    this.upvotePercentage = data?.sentiment_votes_up_percentage || 0;
    this.downvotePercentage = data?.sentiment_votes_down_percentage || 0;
    this.ath = currencyFormat(data?.market_data?.ath?.usd) || '';
    this.atl = currencyFormat(data?.market_data?.atl?.usd) || '';
    this.athDate = new Date(data?.market_data?.ath_date?.usd).toLocaleDateString('en-US');
    this.atlDate = new Date(data?.market_data?.atl_date?.usd).toLocaleDateString('en-US');
    this.social = {
      facebook: {
        link: data?.links?.facebook_username
          ? `https://facebook.com/${data.links.facebook_username}`
          : '',
        subs: data?.community_data?.facebook_likes
          ? `${Intl.NumberFormat().format(data.community_data.facebook_likes)} Likes`
          : ''
      },
      twitter: {
        link: data?.links?.twitter_screen_name
          ? `https://twitter.com/${data.links.twitter_screen_name}`
          : '',
        subs: data?.community_data?.twitter_followers
          ? `${Intl.NumberFormat().format(data.community_data.twitter_followers)} Followers`
          : ''
      },
      reddit: {
        link: data?.links?.subreddit_url || '',
        subs: data?.community_data?.reddit_subscribers
          ? `${Intl.NumberFormat().format(data.community_data.reddit_subscribers)} Subscribers`
          : ''
      },
      telegram: {
        link: data?.links?.telegram_channel_identifier
          ? `https://telegram.org/${data.links.telegram_channel_identifier}`
          : '',
        subs: data?.community_data?.telegram_channel_user_count
          ? `${Intl.NumberFormat().format(data.community_data.telegram_channel_user_count)} Users`
          : ''
      }
    };
    this.reputation = {
      upvotes: data?.sentiment_votes_up_percentage || 0,
      downvotes: data?.sentiment_votes_down_percentage || 0
    };
    this.github = {
      repos: data?.links?.repos_url?.github || [],
      forks: data?.developer_data?.forks
        ? Intl.NumberFormat().format(data.developer_data.forks)
        : '',
      stars: data?.developer_data?.stars
        ? Intl.NumberFormat().format(data.developer_data.stars)
        : '',
      subscribers: data?.developer_data?.subscribers
        ? Intl.NumberFormat().format(data.developer_data.subscribers)
        : '',
      issues: data?.developer_data?.total_issues
        ? Intl.NumberFormat().format(data.developer_data.total_issues)
        : ''
    };
    this.contactLinks = {
      website: data?.links?.homepage?.filter((item: string) => item) || [],
      explorers: data?.links?.blockchain_site?.filter((item: string) => item) || [],
      forum: data?.links?.official_forum_url?.filter((item: string) => item) || [],
      chat: data?.links?.chat_url?.filter((item: string) => item) || [],
      announcement: data?.links?.announcement_url?.filter((item: string) => item) || []
    };
    this.priceChangePercentage = {
      '24 hours': data?.market_data?.price_change_percentage_24h,
      '7 days': data?.market_data?.price_change_percentage_7d,
      '14 days': data?.market_data?.price_change_percentage_14d,
      '1 month': data?.market_data?.price_change_percentage_30d,
      '2 months': data?.market_data?.price_change_percentage_60d,
      '200 days': data?.market_data?.price_change_percentage_200d,
      '1 year': data?.market_data?.price_change_percentage_1y
    };
  }
}
