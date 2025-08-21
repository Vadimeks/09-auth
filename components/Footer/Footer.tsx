// components/Footer/Footer.tsx
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Vadzim Simanau</p>
          <p>
            Contact us:
            <a href="mailto:eks220885@gmail.com"> eks220885@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
