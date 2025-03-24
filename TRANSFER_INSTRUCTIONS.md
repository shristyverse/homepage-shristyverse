# Repository Transfer Instructions

The complete website code is available at: https://github.com/shristy0611/homepage-shristyverse

## Option 1: Transfer Ownership (Recommended)

1. Log in to GitHub with the account that has admin access to both repositories
2. Go to https://github.com/shristy0611/homepage-shristyverse/settings
3. Scroll down to the "Danger Zone"
4. Click "Transfer ownership"
5. Enter "shristyverse" as the new owner
6. Follow the prompts to complete the transfer

## Option 2: Clone and Push (Requires Organization Access)

If you have push access to the organization repository:

```bash
# Clone the personal repository
git clone https://github.com/shristy0611/homepage-shristyverse.git

# Change directory
cd homepage-shristyverse

# Change the remote to point to the organization repository
git remote set-url origin https://github.com/shristyverse/homepage-shristyverse.git

# Push to the organization repository
git push -u origin main
```

## Option 3: Add Organization Member as Collaborator

1. Go to https://github.com/shristy0611/homepage-shristyverse/settings/access
2. Click "Add people"
3. Enter the GitHub username of someone with push access to the organization
4. Give them admin permissions
5. They can then follow Option 2 to push the code to the organization repository

## Setting up GitHub Pages

After the code is in the organization repository:

1. Go to https://github.com/shristyverse/homepage-shristyverse/settings/pages
2. Set the source to "Deploy from a branch"
3. Choose "main" branch and "/ (root)" folder
4. Click "Save"
5. Set custom domain to "shristyverse.com" if desired

The site will be available at:
- https://shristyverse.github.io/homepage-shristyverse/
- https://shristyverse.com (after setting up custom domain) 