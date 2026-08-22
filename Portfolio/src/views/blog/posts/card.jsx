import ActionButton from "@/components/button/actionButton";
import styles from "./posts.module.css";
import RadahnRune from "@/../public/icons/radahnRune";
import { useRouter } from "next/navigation";
function PostsCard({
  image,
  imageAlt,
  title,
  types = [],
  date,
  text,
  buttonText = "READ ME!",
  slug,
}) {
  const router = useRouter();
  function handleClick() {
    router.push(`/blog/${slug}`);
  }

  return (
    <div className={styles["posts-con-card"]}>
      {/*  */}
      {/* Top card image with hover, overlay and image */}
      {/*  */}
      <div className={styles["posts-con-card-img"]} onClick={handleClick}>
        <div className={styles["posts-con-card-img-overlay"]}></div>
        <img src={image} alt={imageAlt} />
        {/*  */}
        {/* Hover background */}
        <div className={styles["posts-con-card-img-hover"]}>
          <div className={styles["posts-con-card-img-hover-con"]}>
            <RadahnRune />
            <RadahnRune />
          </div>
          <div className={styles["posts-con-card-img-hover-con"]}>
            <RadahnRune />
            <RadahnRune />
          </div>
        </div>
      </div>
      {/*  */}
      {/* Heading and article type */}
      {/*  */}
      <div className={styles["posts-con-card-heading"]}>
        <h4>{title}</h4>
        {types.map((type, index) => (
          <h5 key={index}>{type}</h5>
        ))}
        <h5>{date}</h5>
      </div>
      {/*  */}
      {/* Para and CTA */}
      {/*  */}
      <div className={styles["posts-con-card-text"]}>
        <p>{text}</p>

        <ActionButton text={buttonText} type="blog" onClick={handleClick} />
      </div>
    </div>
  );
}

export default PostsCard;
