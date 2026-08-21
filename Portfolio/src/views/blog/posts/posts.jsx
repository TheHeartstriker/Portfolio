import styles from "./posts.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import ActionButton from "@/components/button/actionButton";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import RadahnRune from "@/../public/icons/radahnRune";
import PostsCard from "./card";
import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "./content/articleDes";
function Posts() {
  const filterTypes = [
    "DESIGN",
    "CREATIVE",
    "WEB",
    "VISUAL",
    "SYSTEMS",
    "CODING",
  ];
  const posts = [
    desParticle,
    desMappingFullstack,
    desPolySVG,
    desFlowField,
    desBackendLookLike,
    desHoverCards,
    desColor,
  ];
  return (
    <section className={styles["posts"]}>
      <SectionInfo infoName="POSTS" />
      {/*  */}
      {/* Filter menu */}
      {/*  */}
      <div className={styles["posts-menu"]}>
        {/*  */}
        {/* Filter Item */}
        {filterTypes.map((filterType) => (
          <button className={styles["posts-menu-btn"]} key={filterType}>
            <h3>{filterType}</h3>
          </button>
        ))}
      </div>
      {/*  */}
      {/* Card Container */}
      {/*  */}
      <div className={styles["posts-con"]}>
        {/*  */}
        {/* Cars */}
        {posts.map((article) => (
          <PostsCard
            key={article.slug}
            image={article.image}
            imageAlt={article.title}
            title={article.title}
            types={article.tags}
            date={`${article.date.month}/${article.date.day}/${article.date.year}`}
            text={article.des}
            buttonText="READ ME!"
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  );
}

export default Posts;
