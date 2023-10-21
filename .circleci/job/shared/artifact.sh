pwd
mkdir -p artifact
mkdir -p coverage/cucumber
ls;

# test artifact
cp -r coverage artifact/
cp -r recordings artifact/
cp -r swagger artifact/

source_dir="coverage/feature/"
dest_dir="coverage/cucumber/"
timestamp=$(date +"%Y%m%d%H%M%S")

# Check if the source directory exists
if [ -d "$source_dir" ]; then
    for file in "$source_dir"*.xml; do
        if [ -f "$file" ]; then
            # Get the filename without extension
            base_name=$(basename "$file" .xml)
            
            # Copy the file to the destination directory with a timestamp
            cp "$file" "$dest_dir${base_name}_${timestamp}.xml"
        fi
    done
else
    echo "Source directory does not exist: $source_dir"
fi

# verify 
ls artifact; 
ls artifact/recordings;
ls coverage/cucumber;
