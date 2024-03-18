from infogami import config
from infogami.utils import delegate
from infogami.utils.view import public, safeint, render


class bulk_search(delegate.page):
    path = "/search/bulk"

    def render_template(self):
        return render['bulk_search/demo']
