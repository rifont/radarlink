import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google, LinkedIn, Github, RadarLink } from "@/components/shared/icons";

const Providers = [
  {
    Icon: Github,
    label: "Github",
    name: "github",
  },
  {
    Icon: Google,
    label: "Google",
    name: "google",
  },
  {
    Icon: LinkedIn,
    label: "LinkedIn",
    name: "linkedin",
  },
]

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="md:border-border w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border">
        <div className="border-border bg-background flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://radarlink.tech">
            <RadarLink className="mr-2 h-10 w-10" />
          </a>
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
          <p className="text-primary/50 text-sm">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        <div className="bg-background flex flex-col space-y-4 px-4 py-8 md:px-16">
          {Providers.map(({ Icon, label, name }) => (
            <button
              key={name}
              disabled={signInClicked}
              className={`${signInClicked
                ? "border-border bg-background cursor-not-allowed"
                : "border-border bg-background text-primary hover:bg-background/50 border"
                } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setSignInClicked(true);
                signIn(name);
              }}
            >
              {signInClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Icon className="h-5 w-5" />
                  <p>{`Sign In with ${label}`}</p>
                </>
              )}
            </button>
          ))}

        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
