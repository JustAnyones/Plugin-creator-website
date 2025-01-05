from category import CategoryDraft

def main():
    drafts = [
        CategoryDraft(),
    ]

    for draft in drafts:
        with open(f"../docs/draft-types/{draft.__file__}", "w+") as f:
            draft.to_md_page(f)

if __name__ == "__main__":
    main()