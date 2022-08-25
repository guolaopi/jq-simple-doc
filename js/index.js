$(document).on("ready", function () {
    renderMenu();
    setDoc(DOCS[0].children[0]);
});

function renderMenu() {
    for (let i = 0; i < DOCS.length; i++) {
        const doc = DOCS[i];
        if (doc.children) {
            const folder = $(
                '<div class="doc-folder"><div class="doc-folder-name">' +
                    doc.title +
                    "</div></div>"
            );
            const folderItems = $('<div class="folder-items"></div>');
            for (let j = 0; j < doc.children.length; j++) {
                const docChildren = doc.children[j];
                folderItems.append(
                    $('<div class="doc-item">' + docChildren.title + "</div>")
                );
            }
            folder.append(folderItems);
            $(".left").append(folder);
        } else {
            $(".left").append(
                $('<div class="doc-item">' + doc.title + "</div>")
            );
        }
    }
    $(".doc-item").on("click", function (e) {
        for (let i = 0; i < DOCS.length; i++) {
            const doc = DOCS[i];
            if (doc.title == e.target.innerHTML) {
                setDoc(doc);
                return;
            }
            if (doc.children) {
                for (let j = 0; j < doc.children.length; j++) {
                    const docChildren = doc.children[j];
                    if (docChildren.title == e.target.innerHTML) {
                        setDoc(docChildren);
                        return;
                    }
                }
            }
        }
    });
    $(".doc-folder-name").on("click", function (e) {
        const items = $(e.target).next();
        const isCollapse =
            items.css("height") == "0" ||
            items.css("height") == "0px" ||
            items.css("height") == "0%"
        if (isCollapse) {
            $(e.target).parent().removeClass("collapse");
        } else {
            $(e.target).parent().addClass("collapse");
        }
    });
}

function setDoc(doc) {
    $(".right .doc-title").html(doc.title);
    $(".right .doc-content").html(doc.content);
    $(".doc-item").each((i, e) => {
        if ($(e).html() == doc.title) {
            $(e).addClass("active");
        } else {
            $(e).removeClass("active");
        }
    });
}
