from category import CategoryDraft

def main():
    drafts = [
        CategoryDraft(),
    ]

    for draft in drafts:
        print(draft.to_md_page())

if __name__ == "__main__":
    main()