import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const { results } = postsPagination;

  return (
    <main className={styles.content}>
      <div className={styles.list}>
        {results.map(post => (
          <Link href={`/post/${post.uid}`} legacyBehavior key={post.uid}>
            <a className={styles.post}>
              <h1>Como utilizar Hooks</h1>
              <p>Pensando em sincronizar em vez de ciclos de vida</p>
              <div>
                <div className={styles.iconName}>
                  <FiCalendar />
                  <time>13 de maio de 2023</time>
                </div>
                <div className={styles.iconName}>
                  <FiUser />
                  <time>Rogerinho</time>
                </div>
              </div>
            </a>
          </Link>
        ))}
        <Link href="/" legacyBehavior>
          <a className={styles.post}>
            <h1>Como utilizar Hooks</h1>
            <p>Pensando em sincronizar em vez de ciclos de vida</p>
            <div>
              <div className={styles.iconName}>
                <FiCalendar />
                <time>13 de maio de 2023</time>
              </div>
              <div className={styles.iconName}>
                <FiUser />
                <time>Rogerinho</time>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType(
    'post',
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 100
    }
  );

  const posts: Post[] = response.map(post => ({
    data: {
      author: post.data.author as string,
      subtitle: post.data.subtitle as string,
      title: post.data.title as string,
    },
    first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    uid: post.uid,
  }));

  const pagePosts: PostPagination = {
    next_page: '1',
    results: posts,
  }

  return {
    props: {
      postsPagination: pagePosts,
    },
    revalidate: 60 * 60 * 3 // 24 hours
  }
}
