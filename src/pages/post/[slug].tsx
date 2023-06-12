import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function PostSLUG({ post }: PostProps) {
  return (
    <div className={styles.container}>
      <Image
        src={post.data.banner.url}
        alt={post.data.banner.alt}
        width={700}
        height={200}
        style={{ objectFit: 'contain'}}
      />
      <div className={styles.content}>
        <div className={styles.info}>
          <h1>{post.data.title}</h1>
          <div>
            <div className={styles.iconName}>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
            </div>
            <div className={styles.iconName}>
              <FiUser />
              <p>{post.data.author}</p>
            </div>
            <div className={styles.iconName}>
              <FiClock />
              <time>4 min</time>
            </div>
          </div>
        </div>
        <div className={styles.textPost}>
          {post.data.content.map(content => (
            <div key={content.heading}>
              <h3>{content.heading}</h3>
              {content.body.map(body => (
                <p key={body.text.slice(0, 20)}>{body.text}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug : string };

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', slug);

  const post: Post = {
    data: {
      author: response.data.author as string,
      banner: {
        url: response.data.banner.url ?? '',
        alt: response.data.banner.alt ?? '',
      },
      content: response.data.content.map(conten => ({
        heading: conten.heading as string,
        body: conten.body.map(body => ({
          text: body.text,
        })),
      })),
      title: response.data.title as string,
    },
    first_publication_date: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    last_publication_date: response.last_publication_date
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 3 // 24 hours
  }
}
