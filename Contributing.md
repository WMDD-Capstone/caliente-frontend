# Contributing to Caliente Frontend

Guidelines for contributing to our React Native Expo project.

---

## 🔄 Workflow

1. Create branch from `dev`: `git checkout -b feature/your-feature`
2. Make changes
3. Run checks: `npm run lint && npm run type-check && npm run format`
4. Test on iOS & Android
5. Commit & push
6. Create PR to `dev`

---

## 🌿 Branch Strategy

- **`main`** - Production (a individual deploying)
- **`dev`** - Integration branch (merge Bitna, Erald)
- **`<name>/feature`** - Your name and feature branches
  - Examples: `bitna/video-upload`, `bitna/ai-feedback`
- **`<name>/fix`** - Bug fixes
  - Examples: `bitna/camera-crash`, `erald/login-error`

---

## 💬 Commit Messages

Format: `<type>: <description>`

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `chore` - Config, docs, build
- `refactor` - Code refactoring
- `test` - Tests
- `docs` - Documentation
- `perf` - Performance
- `style` - Formatting

**Examples:**

```bash
feat: add video recording screen
fix: resolve Android camera crash
chore: update expo SDK to 54.0
```

---

## 📝 File Naming

**Components (React Native)**

- `PascalCase.tsx` - Components: `VideoCard.tsx`, `UserAvatar.tsx`

**Utils**

- `camelCase.ts` - Utils: `calculateScore.ts`, `formatDate.ts`

**Hooks**

- `useCamelCase.ts` - Hooks: `useVideoUpload.ts`, `useAuth.ts`

**Types**

- `camelCase.types.ts` - Types: `api.types.ts`, `video.types.ts`, `user.types.ts`

---

## 🎨 Code Style

- **ESLint + Prettier** enforced
- **2 spaces** indentation, **semicolons** required
- **Single quotes** for strings
- Run `npm run lint` before committing

**TypeScript:**

- Always define types for props
- Avoid `any` - use `unknown` if needed
- Prefer `interface` for objects

```typescript
// ✅ Good
interface VideoCardProps {
  videoId: string;
  onPress: () => void;
}

// ❌ Bad
const VideoCard = (props: any) => {...}
```

---

## 🎨 Styling with Tailwind

- Use **NativeWind (Tailwind CSS)** for all styling
- **No inline styles** unless absolutely necessary

```typescript
// ✅ Good - Tailwind classes
<View className="p-4 bg-white rounded-lg">
  <Text className="text-lg font-bold">Title</Text>
</View>


// ❌ Bad - inline styles
<View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8 }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title</Text>
</View>
```

---

## 🧪 Testing

```bash
npm run lint          # Lint code
npm run type-check    # Type check
```

**Before PR:**

- [ ] Type check passes
- [ ] Linter passes
- [ ] Code formatted
- [ ] Tested on iOS & Android

---

## 🔍 Pull Request

**Before creating PR:**

- [ ] Code follows style guide
- [ ] No `console.log` left
- [ ] Tested on both platforms
- [ ] Screenshots added (UI changes)

**PR Template:**

```markdown
## What

Brief description

## Testing

- [ ] iOS
- [ ] Android

## Screenshots

[Add if UI changed]
```

**Process:**

1. Create PR to `dev` branch
2. A individual deploying will review (1-2 days)
3. Address feedback
4. Merge after approval

---

## 🆘 Questions?

- Check [Expo Docs](https://docs.expo.dev/)
- Ask in #caliente-dev Slack channel
- Tag team lead in GitHub issues

---

Thanks for contributing! 🚀
