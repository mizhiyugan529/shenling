import Button from 'flarum/components/Button';
import avatar from 'flarum/helpers/avatar';
import icon from 'flarum/helpers/icon';
import username from 'flarum/helpers/username';
import humanTime from 'flarum/helpers/humanTime';
import extractText from 'flarum/utils/extractText';

/**
 * The `DiffButton` component composes a button
 * for all revisions created in DiffList.
 */
export default class DiffButton extends Button {
  // see the following link to find out why i'm overriding this at all
  // https://discuss.flarum.org/d/22728-passing-an-object-to-a-custom-button-component
  view() {
    const attrs = Object.assign({}, this.props);

    delete attrs.item;
    delete attrs.subButton;
    delete attrs.postDate;

    attrs.type = 'button';

    return <button {...attrs}>{this.getButtonContent()}</button>;
  }

  getButtonContent() {
    const revision = this.props.item;
    let actor = revision.actor();

    let buttonText =
      revision.revision() == 0
        ? /* {username} created {ago} */
          extractText(
            app.translator.trans('the-turk-diff.forum.createdInfo', {
              username: username(revision.actor()),
              ago: humanTime(this.props.postDate),
            })
          )
        : /* {username} edited {ago} */
          extractText(
            app.translator.trans('the-turk-diff.forum.editedInfo', {
              username: username(revision.actor()),
              ago: humanTime(revision.createdAt()),
            })
          );

    if (revision.deletedAt()) {
      if (this.props.subButton === false) {
        /* {username} did something {ago} (deleted) */
        buttonText = buttonText + ' ' + app.translator.trans('the-turk-diff.forum.deletedText');
      } else {
        /* sub button text that appears when you click on caret icon */
        actor = revision.deletedUser();
        /* {actor} deleted this content {ago} */
        buttonText = extractText(
          app.translator.trans('the-turk-diff.forum.deletedInfo', {
            username: username(revision.deletedUser()),
            ago: humanTime(revision.deletedAt()),
          })
        );
      }
    }

    return [
      // we also should consider deleted users here
      actor.username() ? avatar(actor) : '',
      // does this button have an icon?
      revision.deletedAt() && this.props.subButton === false
        ? icon('fas fa-caret-down', {
            className: 'Button-caret',
          })
        : '',
      // button label
      <span className="Button-label" title={buttonText}>
        {revision.deletedAt() && this.props.subButton === true ? (
          /* emphasize deleted revision's information */
          <em>{buttonText}</em>
        ) : (
          buttonText
        )}
      </span>,
    ];
  }
}
