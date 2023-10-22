git submodule sync && git submodule update --init
git submodule update --remote --recursive
git submodule update --remote --merge
sudo -E bash -c 'echo $GITHUB_TOKEN'